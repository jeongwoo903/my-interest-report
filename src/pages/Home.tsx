import * as XLSX from 'xlsx';
import { ChangeEvent, useState, useRef, useReducer, useEffect, useId } from 'react';
import OpenAI from 'openai';
import { css, Theme } from '@emotion/react';
import SectionHeader from 'components/SectionHeader.tsx';
import FileUpload from 'components/FileUpload.tsx';
import Button from 'components/Button.tsx';
import UploadIcon from 'assets/svg/upload-icon.svg?react';
import Space from 'components/Space.tsx';
import Calendar from 'components/Calendar/Calendar.tsx';
import CalendarButton from 'components/Calendar/CalendarButton.tsx';
import CalendarMenu from 'components/Calendar/CalendarMenu.tsx';
import DateButton from 'components/Calendar/DateButton.tsx';

interface JsonDataProps {
  Date: Date;
  Message: string | null;
  User: string;
}

function getFile(event: ChangeEvent<HTMLInputElement>): File | null {
  return event.target.files?.[0] ?? null;
}

async function ExcelToJson(file: File): Promise<JsonDataProps[]> {
  const arrayBuffer = await file.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array', cellDates: true });

  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  let jsonData: JsonDataProps[] = XLSX.utils.sheet_to_json(sheet);
  return jsonData;
}

function extractLinksByDate(jsonData: JsonDataProps[]): JsonDataProps[] {
  return jsonData.filter(item => {
    return (
      typeof item.Message === 'string' &&
      (item.Message.startsWith('https') || item.Message.startsWith('http'))
    );
  });
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string>('');
  const [isOpen, toggleIsOpen] = useReducer(state => {
    return !state;
  }, false);
  const [date, setDate] = useState<string>('이번 달');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dates = [
    { value: '올해' },
    { value: '지난 6개월' },
    { value: '지난 3개월' },
    { value: '이번 달' },
    { value: '오늘' },
  ];

  function changeFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = getFile(event);
    setFile(selectedFile);
  }

  async function parseExcelFile(file: File) {
    if (!file) throw new Error('파일이 없습니다.');
    return await ExcelToJson(file);
  }

  function formatLinks(jsonData: JsonDataProps[]) {
    const linkData = extractLinksByDate(jsonData);
    return linkData.map(item => `Link: ${item.Message}`).join('\n');
  }

  async function analyzeLinksWithOpenAI(formattedLinks) {
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: '너는 유능한 데이터 분석가야. 데이터들을 관심사별로 알맞게 분석하는 역할을 해.',
        },
        {
          role: 'user',
          content: `
        해당 데이터는 사용자가 공유한 링크 목록이야. \n 
        각 목록들을 관심사 별로 구별해서 분류해줘. \n 
        응답은 json 형식으로 data를 category, count, links 형태로 각각 묶어서 전달해줘.
        데이터: ${formattedLinks}`,
        },
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  }

  async function handleParse() {
    try {
      if (!file) return;

      const jsonData = await parseExcelFile(file);
      const formattedLinks = formatLinks(jsonData);
      console.log(formattedLinks);

      const analysisResult = await analyzeLinksWithOpenAI(formattedLinks);
      setData(analysisResult);
      console.log(analysisResult);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // 파일 미러 클릭
  function fileInputMirrorClick() {
    fileInputRef.current?.click();
  }

  // 파일 state에 따른 렌더링 변화
  function renderMessageByFile(defaultMessage: string, uploadedMessage: string) {
    const hasFile = file !== null && file !== undefined;
    return hasFile ? uploadedMessage : defaultMessage;
  }

  // 드래그 앤 드롭된 파일을 state에 저장
  function handleFileDrop(droppedFile: File) {
    setFile(droppedFile);
  }

  return (
    <div css={contentCss}>
      <div>
        <SectionHeader
          title={'📑 나의 관심사 분석기'}
          desc={'카카오톡 나의 채팅방에 저장해둔 링크들을 분석해드립니다!'}
        />

        <Space size={60} />

        <FileUpload onFileDrop={handleFileDrop}>
          <UploadIcon />
          <div css={FileUploadDescCss}>
            <p>
              {renderMessageByFile(
                '여기에 채팅 파일을 끌어다 놓거나 업로드 해주세요.',
                `파일: ${file?.name}`,
              )}
            </p>
          </div>
          <Space size={35} />
          <Button onClick={fileInputMirrorClick}>
            {renderMessageByFile('파일 업로드', '파일 재업로드')}
          </Button>
          <input
            css={FileInputCss}
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx"
            onChange={changeFile}
          />
          <Space size={45} />
        </FileUpload>

        <Space size={12} />

        <div css={toolsCss}>
          <Calendar>
            <CalendarButton clickEvent={toggleIsOpen} />
            <CalendarMenu isOpen={isOpen}>
              {dates.map(({ value }) => (
                <DateButton
                  key={useId()}
                  value={value}
                  isSelected={date === value}
                  onClick={() => {
                    setDate(value);
                    toggleIsOpen();
                  }}
                >
                  {value}
                </DateButton>
              ))}
            </CalendarMenu>
          </Calendar>

          <Button onClick={handleParse} disabled={!file}>
            분석하기
          </Button>
        </div>
      </div>
    </div>
  );
}

const contentCss = (theme: Theme) => css`
  ${theme.common.flex_center};
  height: 100%;
  margin: 0 auto;

  > div {
    padding: 0 1rem;
    transform: translateY(-${theme.layout.header_height});
  }
`;

const FileUploadDescCss = (theme: Theme) => css`
  color: ${theme.color.subText};

  > p {
    width: 400px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FileInputCss = () => css`
  display: none;
`;

const toolsCss = () => css`
  display: flex;
  justify-content: end;
  gap: 14px;
`;
