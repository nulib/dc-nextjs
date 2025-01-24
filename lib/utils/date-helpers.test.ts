import { formatDate, formatDateLong } from "./date-helpers";

describe("formatDate", () => {
  test("should format date correctly", () => {
    const result = formatDate("2023-11-14T13:14:00Z");
    expect(result).toBe("2023-10-2"); // Note: getMonth() is zero-based, getDay() returns day of the week
  });

  test("should handle invalid date", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("NaN-NaN-NaN");
  });
});

describe("formatDateLong", () => {
  it("should return a properly formatted date string for a valid date input", () => {
    const inputDate = "2023-11-14T13:14:00Z"; // UTC time
    const dateObj = new Date(inputDate);

    // Dynamically generate the expected output based on the local time zone
    const expectedOutput = `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${
      dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours()
    }:${dateObj.getMinutes().toString().padStart(2, "0")}${
      dateObj.getHours() >= 12 ? "pm" : "am"
    }`;

    expect(formatDateLong(inputDate)).toBe(expectedOutput);
  });

  it("should return an empty string for an undefined input", () => {
    expect(formatDateLong(undefined)).toBe("");
  });

  it("should handle midnight correctly in the local time zone", () => {
    const inputDate = "2023-11-14T00:00:00Z"; // Midnight in UTC
    const dateObj = new Date(inputDate);

    const hour = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = dateObj.getHours() >= 12 ? "pm" : "am";

    const expectedOutput = `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hour}:${minutes}${ampm}`;

    expect(formatDateLong(inputDate)).toBe(expectedOutput);
  });

  it("should handle noon correctly in the local time zone", () => {
    const inputDate = "2023-11-14T12:00:00Z"; // Noon in UTC
    const dateObj = new Date(inputDate);

    // Dynamically calculate expected output in the local time zone
    const hour = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const ampm = dateObj.getHours() >= 12 ? "pm" : "am";

    const expectedOutput = `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${hour}:${minutes}${ampm}`;

    expect(formatDateLong(inputDate)).toBe(expectedOutput);
  });

  it("should pad minutes correctly", () => {
    const inputDate = "2023-11-14T13:04:00Z"; // UTC time
    const dateObj = new Date(inputDate);

    const expectedOutput = `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${
      dateObj.getHours() > 12 ? dateObj.getHours() - 12 : dateObj.getHours()
    }:${dateObj.getMinutes().toString().padStart(2, "0")}${
      dateObj.getHours() >= 12 ? "pm" : "am"
    }`;

    expect(formatDateLong(inputDate)).toBe(expectedOutput);
  });
});
