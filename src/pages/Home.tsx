import { useState, useReducer, useId, useRef } from 'react';
import { css, Theme } from '@emotion/react';
import { isEqual } from 'lodash';
import SectionHeader from 'components/SectionHeader.tsx';
import FileUpload from 'components/FileUpload.tsx';
import Button from 'components/Button.tsx';
import UploadIcon from 'assets/svg/upload-icon.svg?react';
import Space from 'components/Space.tsx';
import Calendar from 'components/Calendar/Calendar.tsx';
import CalendarButton from 'components/Calendar/CalendarButton.tsx';
import CalendarMenu from 'components/Calendar/CalendarMenu.tsx';
import DateButton from 'components/Calendar/DateButton.tsx';
import { DateRange, getCurrentDate, getXMonthsAgo } from 'utils/date.ts';
import { useFileUpload } from 'hooks/useFileUpload.ts';
import { getResultData, ResultDataProps } from 'apis/getResultData.ts';
import { useClickOutside } from 'hooks/useClickOutside.ts';
import { extractLinksByDate } from 'utils/extractLinkByDate.ts';

export default function Home() {
  const { year, month, day } = getCurrentDate();
  const { file, fileInputRef, uploadFile, parseExcelFile, fileInputMirrorClick } = useFileUpload();
  const [result, setResult] = useState<ResultDataProps | null>(null);
  /** Default: 이번 달 */
  const [date, setDate] = useState<DateRange>([`${year}-${month}-01`, `${year}-${month}-${day}`]);
  const [isOpen, toggleIsOpen] = useReducer(state => {
    return !state;
  }, false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const dates: { label: string; value: DateRange }[] = [
    { label: '올해', value: [`${year}-01-01`, `${year}-${month}-${day}`] },
    { label: '지난 12개월', value: [getXMonthsAgo(12), `${year}-${month}-${day}`] },
    { label: '지난 6개월', value: [getXMonthsAgo(6), `${year}-${month}-${day}`] },
    { label: '지난 3개월', value: [getXMonthsAgo(3), `${year}-${month}-${day}`] },
    { label: '이번 달', value: [`${year}-${month}-01`, `${year}-${month}-${day}`] },
    { label: '오늘', value: [`${year}-${month}-${day}`, `${year}-${month}-${day}`] },
  ];

  useClickOutside(calendarRef, () => {
    if (isOpen) {
      toggleIsOpen();
    }
  });

  // 파일 state에 따른 렌더링 변화
  function renderMessageByFile(defaultMessage: string, uploadedMessage: string) {
    const hasFile = file !== null && file !== undefined;
    return hasFile ? uploadedMessage : defaultMessage;
  }

  // 데이터 분석
  async function analyzeData() {
    try {
      if (!file) return;

      const jsonData = await parseExcelFile(file);
      const linkData = extractLinksByDate(jsonData, date);
      const result = await getResultData(linkData);

      setResult(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div css={contentCss}>
      <div>
        <SectionHeader
          title={'📑 나의 관심사 분석기'}
          desc={'카카오톡 나의 채팅방에 저장해둔 링크들을 분석해드립니다!'}
        />

        <Space size={60} />

        <FileUpload onFileDrop={uploadFile}>
          <UploadIcon />
          <p css={FileUploadDescCss}>
            {renderMessageByFile(
              '여기에 채팅 파일을 끌어다 놓거나 업로드 해주세요.',
              `파일: ${file?.name}`,
            )}
          </p>
          <Space size={35} />
          <Button onClick={fileInputMirrorClick}>
            {renderMessageByFile('파일 업로드', '파일 재업로드')}
          </Button>
          <input
            css={FileInputCss}
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx"
            onChange={uploadFile}
          />
          <Space size={45} />
        </FileUpload>

        <Space size={12} />

        <div css={toolsCss} ref={calendarRef}>
          <Calendar>
            <CalendarButton clickEvent={toggleIsOpen} />
            <CalendarMenu isOpen={isOpen}>
              {dates.map(({ label, value }) => (
                <DateButton
                  key={useId()}
                  value={value}
                  isSelected={isEqual(date, value)}
                  onClick={() => {
                    setDate(value);
                  }}
                >
                  {label}
                </DateButton>
              ))}
            </CalendarMenu>
          </Calendar>

          <Button onClick={analyzeData} disabled={!file}>
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
  width: 400px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileInputCss = () => css`
  display: none;
`;

const toolsCss = () => css`
  display: flex;
  justify-content: end;
  gap: 14px;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
