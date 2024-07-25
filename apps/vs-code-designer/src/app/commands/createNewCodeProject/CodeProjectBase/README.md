# Cloud to Local Logic App Importer

This tool is designed to facilitate the migration of Azure Logic Apps from the cloud to a local development environment. It automates the process of importing a zipped Logic App, extracting its contents, and setting up a local workspace for further development and testing. Below is an overview of its functionality and components.

## Overview

The script uses `createNewCodeProject.ts` as a template and follows a structured approach to import and configure the Logic App locally. It performs several key operations:

- **Unzipping the Logic App**: Takes a zipped Logic App file from the desktop and unzips it into the local workspace.
- **Configuration and Settings**: Extracts and applies necessary configurations and settings from the zipped file to the local environment. This includes handling connection strings, parameters, and local settings adjustments to fit the local development context.

## Key Components

- **Settings Management**: Fetches and sets up settings required for the Logic App to function locally, including modifying local settings to remove or adjust values not applicable outside the cloud environment.
- **Azure Wizard Integration**: Leverages the Azure Wizard for VS Code to guide the user through the import process, including selecting a folder, naming the workspace, and choosing the Logic App name.
- **Connection Details Handling**: Extracts connection details from the zipped Logic App, parameterizes them for local use, and updates the local settings file accordingly.
- **File Operations**: Reads and writes files as needed, including the extraction of the Logic App zip file, and the management of local settings and connection files.

## Process Flow

1. **Initialization**: The script starts by adding telemetry for local function development and displaying a preview warning.
2. **Wizard Setup**: Sets up and executes an Azure Wizard instance to guide the user through the setup process, including folder selection and project configuration.
3. **Zip File Processing**: Extracts the Logic App from the provided zip file, including fetching and processing connection details.
4. **Settings Adjustment**: Adjusts local settings for the Logic App to ensure compatibility with the local environment, including cleaning up unnecessary settings and setting up local storage.
5. **Finalization**: Writes updated connection and settings files to the local workspace, cleans up local settings, and displays a completion message.

## Usage

To use this tool, ensure you have a zipped Logic App ready from the Azure Portal to import. Follow the prompts provided by the Azure Wizard within VS Code to complete the import process. The tool handles the extraction, configuration, and setup of the Logic App in your local development environment.
## Prerequisites

- **Visual Studio Code**: Ensure you have Visual Studio Code installed with the Azure Logic Apps extension.
- **Azure Subscription**: A valid Azure subscription is required to fetch some of the configuration details, although the primary operation is local.
- **Node.js**: Some operations may require Node.js to be installed for local function execution and dependency management.

## Configuration

Before running the script, ensure that your environment is configured with the necessary Azure credentials and that you have access to the zipped Logic App file you intend to import.

## Running the Script

1. Place the zipped Logic App file on your desktop or in a known location.
2. Open Visual Studio Code and ensure the Azure Logic Apps extension is installed and configured.
3. Execute the script, following the prompts provided by the Azure Wizard to select your workspace and configure the imported Logic App.

## Troubleshooting

- **Dependency Errors**: Ensure all required Node.js packages are installed and up-to-date.
- **Azure Authentication**: Verify that your Azure credentials are correctly configured in Visual Studio Code.
- **Zip File Issues**: Ensure the Logic App zip file is not corrupted and you include all app settings when downloading
- **Tips from me**: Using the debugger tool was probably the most helpful.

## Known Issues

Right now the parameters.json file is not being converted back to ManagedServiceIdentity in the deploy function. So it should be "Type: String" and the "Value: ManagedServiceIdentity" for the Authentication.

There is also the issue of grabbing the connectionKey when the connections.json is already parameterized. If this is the case then the subscriptionId, ResourceGroup and Location should be in the local settings already, I made a implementation of this in getSettings function but I have not tested it.

When importing the project locally the LA extension should check if all the fields in connection.json is parameterized. If not, then parameterized and switch to using connection key auth no matter what type of auth was previosuly configured in connection.json for managed connection

## Conclusion

This tool simplifies the process of migrating Azure Logic Apps to a local development environment, automating the extraction, configuration, and setup steps. By following the guided process, developers can quickly set up their Logic Apps locally for development, testing, and debugging purposes.