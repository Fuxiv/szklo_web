import { pl } from "./pl";
const { defaultLanguage } = { defaultLanguage: "pl" };

type LanguageType = "pl" | null;
let language: LanguageType = null;
export const initLanguage = (name: LanguageType) => {
  language = name;
};
export const saveLanguage = (name: LanguageType) => {
  language = name;
};
export const getString = <AreaName extends keyof typeof pl>(
  area: AreaName,
  stringName: keyof typeof pl[AreaName]
) => {
  if (!language) {
    language = defaultLanguage as LanguageType;
  }
  if (language === "pl") {
    return pl[area][stringName];
  }
  return pl[area][stringName];
  // if (language === 'en') {
  //   return en[area][stringName];
  // }
};


export type StringArea = keyof typeof pl;

export type ErrorMessage = keyof typeof pl['error'];
//
// export type TitleString = keyof typeof pl['all'];

