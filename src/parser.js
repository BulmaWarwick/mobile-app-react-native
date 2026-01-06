import { parse } from 'iso8601-duration';

class Parser {
  parseDuration(str) {
    const match = str.match(/^P(\d+)D$/);
    if (match) {
      const days = parseInt(match[1], 10);
      return `${days} days`;
    }

    const match2 = str.match(/^P(\d+)DT(\d+)H$/);
    if (match2) {
      const days = parseInt(match2[1], 10);
      const hours = parseInt(match2[2], 10);
      return `${days} days ${hours} hours`;
    }

    const match3 = str.match(/^P(\d+)DT(\d+)H(\d+)M$/);
    if (match3) {
      const days = parseInt(match3[1], 10);
      const hours = parseInt(match3[2], 10);
      const minutes = parseInt(match3[3], 10);
      return `${days} days ${hours} hours ${minutes} minutes`;
    }

    const match4 = str.match(/^P(\d+)DT(\d+)H(\d+)M(\d+)S$/);
    if (match4) {
      const days = parseInt(match4[1], 10);
      const hours = parseInt(match4[2], 10);
      const minutes = parseInt(match4[3], 10);
      const seconds = parseInt(match4[4], 10);
      return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    }

    try {
      const duration = parse(str);
      return `${duration.days} days ${duration.hours} hours ${duration.minutes} minutes ${duration.seconds} seconds`;
    } catch (error) {
      return `Invalid duration string: ${str}`;
    }
  }

  parseTimestamp(str) {
    const date = new Date(str);
    if (isNaN(date.getTime())) {
      return `Invalid timestamp string: ${str}`;
    }

    return date.toISOString();
  }
}

export default Parser;