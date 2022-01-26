import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariavel {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variaveis: ITemplateVariavel;
}
export default class HandlebarsMailTemplate {
  public async parse({ file, variaveis }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variaveis);
  }
}
