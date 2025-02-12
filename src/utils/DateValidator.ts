const PREFIX = "날짜를 다시 확인해 주세요!";

const ERROR_MESSAGES = {
  overToday: `${PREFIX} 현재 날짜보다 이전 날짜는 선택할 수 없습니다.`,
  overEndDate: `${PREFIX} 시작 날짜는 종료 날짜보다 빠를 수 없습니다.`,
};

class DateValidator {
  /**
   * 주어진 날짜가 오늘 이후인지 검사합니다.
   */
  static isOverToday(date: string) {
    if (new Date(date) < new Date()) {
      alert(ERROR_MESSAGES.overToday);
      return true;
    }
    return false;
  }

  /**
   * 시작 날짜가 종료 날짜보다 이후인지 검사합니다.
   */
  static isOverEndDate(startDate: string, endDate: string) {
    if (new Date(startDate) > new Date(endDate)) {
      alert(ERROR_MESSAGES.overEndDate);
      return true;
    }
    return false;
  }
}

export default DateValidator;
