namespace App {
  //! Validation
  export interface Validation {
    value: String | Number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validDetails: Validation) {
    console.log(validDetails);
    let isValid = true;
    if (validDetails.required) {
      isValid = isValid && validDetails.value.toString().trim().length > 0;
    }

    if (
      validDetails.minLength != null &&
      typeof validDetails.value === "string"
    ) {
      isValid = isValid && validDetails.value.length >= validDetails.minLength;
    }

    if (
      validDetails.maxLength != null &&
      typeof validDetails.value === "string"
    ) {
      isValid = isValid && validDetails.value.length <= validDetails.maxLength;
    }

    if (validDetails.min != null && typeof validDetails.value === "number") {
      isValid = isValid && validDetails.value >= validDetails.min;
    }

    if (validDetails.max != null && typeof validDetails.value === "number") {
      isValid = isValid && validDetails.value <= validDetails.max;
    }

    return isValid;
  }
}
