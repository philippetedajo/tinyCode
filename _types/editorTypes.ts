export enum EDITOR_TYPES {
  WebEditor = "WebEditor",
  PythonEditor = "PythonEditor",
}

export interface LanguagePropsInterface {
  title: string;
  entryPoints: string;
  monacoLanguage: string;
  data: string;
}

export interface IObjectKeys {
  [key: string]: LanguagePropsInterface;
}

export interface WebInterface extends IObjectKeys {
  javascript: LanguagePropsInterface;
  css: LanguagePropsInterface;
  html: LanguagePropsInterface;
}

export interface PythonInterface extends IObjectKeys {
  python: LanguagePropsInterface;
}

export interface EditorValueInterface {
  name: string;
  description: string;
  public: boolean;
  iconSrc: string;
  editor: string;
  tabs: WebInterface | PythonInterface;
}
