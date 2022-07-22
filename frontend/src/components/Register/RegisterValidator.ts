const validField = {
  firstname: (firstname: string) => {
    if (firstname.trim().length === 0)
      return {
        isValid: false,
        comment: "The firstname field can't be empty, Please correct it!",
      };
    if (firstname.trim().length <= 2)
      return {
        isValid: false,
        comment:
          "The firstname should be at least three characters long, Please correct it!",
      };

    return {
      isValid: true,
      comment: null,
    };
  },
  surname: (surname: string) => {
    if (surname.trim().length === 0)
      return {
        isValid: false,
        comment: "The surname field can't be empty, Please correct it!",
      };
    if (surname.trim().length <= 2)
      return {
        isValid: false,
        comment:
          "The surname should be at least three characters long, Please correct it!",
      };

    return {
      isValid: true,
      comment: null,
    };
  },
  password: (password: string) => {
    if (password.trim().length === 0)
      return {
        isValid: false,
        comment: "The password can't be empty, Please correct it!",
      };

    if (password.trim().length < 8)
      return {
        isValid: false,
        comment: "Password must be at least 8 in length, Please correct it!",
      };
    return {
      isValid: true,
      comment: null,
    };
  },

  email: (email: string) => {
    if (email.trim().length === 0)
      return {
        isValid: false,
        comment: "The Email field can't be empty, Please correct it!",
      };
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return {
        isValid: false,
        comment: "Enter a valid email!",
      };
    return {
      isValid: true,
      comment: null,
    };
  },
  birthDate: (date: Date) => {
    const actualDate = new Date();
    const passedDate = new Date(date);
    const minDate = new Date("1900.01.01");
    if (
      actualDate.valueOf() - passedDate.valueOf() < 0 ||
      passedDate.valueOf() - minDate.valueOf() <= 0
    )
      return {
        isValid: false,
        comment: "Enter a valid birth date, Please!",
      };
    return {
      isValid: true,
      comment: null,
    };
  },
  country: (passedCountry: string, countries: string[]) => {
    if (countries.find((coun) => coun === passedCountry) === undefined)
      return {
        isValid: false,
        comment: "You must select country from select field!",
      };
    return {
      isValid: true,
      comment: null,
    };
  },
};

export const areFieldsValid = (
  firstname: string,
  surname: string,
  password: string,
  email: string,
  birthDate: Date,
  country: {
    availableCountries: string[];
    passedCountry: string;
  }
) => {
  return {
    firstname: validField.firstname(firstname),
    surname: validField.surname(surname),
    password: validField.password(password),
    email: validField.email(email),
    birthDate: validField.birthDate(birthDate),
    country: validField.country(
      country.passedCountry,
      country.availableCountries
    ),
  };
};
