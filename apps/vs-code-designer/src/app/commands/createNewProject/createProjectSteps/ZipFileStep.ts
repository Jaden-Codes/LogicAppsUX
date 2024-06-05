import { unzipLogicAppArtifacts } from '../../../utils/taskUtils';
import * as vscode from 'vscode';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { localize } from '../../../../localize';
import { AzureWizardPromptStep } from '@microsoft/vscode-azext-utils';
import type { IAzureQuickPickItem } from '@microsoft/vscode-azext-utils';
import type { IFunctionWizardContext } from '@microsoft/vscode-extension-logic-apps';
import * as rimraf from 'rimraf';

export class ZipFileStep extends AzureWizardPromptStep<IFunctionWizardContext> {
  private zipContent: Buffer | Buffer[];
  private targetDirectory: string;
  private static zipFilePath: string;
  private wizardContext: IFunctionWizardContext;

  public hideStepCount = true;
  public supportsDuplicateSteps = false;

  // will likely need to change the location of the start zip path
  public static async setZipFilePath(_context: Partial<IFunctionWizardContext>): Promise<void> {
    const fileUris = await vscode.window.showOpenDialog({
      canSelectMany: false,
      defaultUri: vscode.Uri.file(path.join(os.homedir(), 'Desktop')),
      // filters: {
      //     'Zip files': ['zip']
      // },
      openLabel: localize('selectZipFile', 'Select a zip file'),
    });

    if (fileUris && fileUris.length > 0) {
      ZipFileStep.zipFilePath = fileUris[0].fsPath;
    }
  }

  public async prompt(context: IFunctionWizardContext): Promise<void> {
    this.wizardContext = context;
    await ZipFileStep.setZipFilePath(context);
    await this.getZipFiles();
  }

  public shouldPrompt(_context: IFunctionWizardContext): boolean {
    return this.zipContent === undefined;
  }

  private async getZipFiles(): Promise<IAzureQuickPickItem<Buffer>[]> {
    try {
      if (ZipFileStep.zipFilePath) {
        console.log(`zipFilePath: ${ZipFileStep.zipFilePath}`);
        this.zipContent = fs.readFileSync(ZipFileStep.zipFilePath);
        console.log(`workspacePath: ${this.wizardContext.workspacePath}`);
        this.targetDirectory = path.join(this.wizardContext.workspacePath, this.wizardContext.logicAppName);
        console.log(`targetDirectory: ${this.targetDirectory}`);
        await unzipLogicAppArtifacts(this.zipContent, this.targetDirectory);

        const zipBaseName = path.basename(ZipFileStep.zipFilePath, path.extname(ZipFileStep.zipFilePath));
        const excludedFiles = [`${zipBaseName}.csproj`, '.vscode', 'obj', 'bin', 'local.settings.json', 'host.json'];
        for (const file of excludedFiles) {
          rimraf.sync(path.join(this.targetDirectory, file));
        }
      }
    } catch (error) {
      console.error('Failed to unzip the Logic App artifacts', error);
    }
    return Promise.resolve([]);
  }
}
