import { app } from 'electron';

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';

app.on('ready', (): void => {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension): void => {
    installExtension(extension)
      .then((name): void => console.log(`Added Extension: ${name}`))
      .catch((err): void => console.log('An error occurred: ', err));
  });
});
