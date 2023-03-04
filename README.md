# Referencing Views Extension for Azure Data Studio

This is an extension for Azure Data Studio that solves the problem of identifying which views or tables are referencing a specific table or view. During the development process, when you want to change or drop a table or view, it's essential to understand which other views are using it, so you can plan accordingly. This extension makes it easy to view all the referencing views and schemas for a particular table or view.

### Features

- The extension allows you to right-click on a table or view in Azure Data Studio and select "Show Referencing Views." 
- Once you select the option, a new query window will open up, and a query will be executed that shows you all the referencing views and their schemas.
- This extension currently supports only the MSSQL provider.

### Installation

## Manual Installation from VSIX File

To manually install this extension from a VSIX file, follow these steps:

1. Download the VSIX file for the referencing-views extension from **install** folder.
2. Open Azure Data Studio.
3. Click on the Extensions icon on the left-hand side navigation bar.
4. Select "Install from VSIX..." from the ellipsis menu on the top-right corner of the Extensions panel.
5. Browse and select the downloaded VSIX file.
6. Click on "Install" to install the extension.
7. Once the installation is complete, reload Azure Data Studio to start using the extension.

### Usage

To use this extension, follow the steps below:

1. Connect to your MSSQL server in Azure Data Studio.
2. Expand the Databases or Views folder.
3. Right-click on a table or view that you want to see the referencing views for.
4. Select "Show referencing views."
5. A new query window will open up, and a query will be executed that shows you all the referencing views and their schemas.

### Contributing

Contributions to this extension are welcome. If you find a bug or want to suggest an improvement, please submit a pull request.

### License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT).