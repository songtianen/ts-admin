/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import MyIcon from '../../../components/MyIcon';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IFullScreenProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FullScreen: React.FunctionComponent<IFullScreenProps> = (props) => {
  const [isfullScreen, setFullScreen] = React.useState(false);
  React.useEffect(() => {
    const { fullscreenElement } = document;
    const { mozFullScreenElement } = document;
    const { webkitFullscreenElement } = document;
    const { mozFullScreen } = document;
    const fullScreen = document.fullscreen;
    const { webkitIsFullScreen } = document;
    const myFullscreen =
      fullscreenElement ||
      mozFullScreenElement ||
      webkitFullscreenElement ||
      fullScreen ||
      mozFullScreen ||
      webkitIsFullScreen;
    const newisFullscreen = !!myFullscreen;

    document.addEventListener('fullscreenchange', () => {
      setFullScreen((val) => {
        return !val;
      });
    });
    document.addEventListener('mozfullscreenchange', () => {
      setFullScreen((val) => {
        return !val;
      });
    });
    document.addEventListener('webkitfullscreenchange', () => {
      setFullScreen((val) => {
        return !val;
      });
    });
    document.addEventListener('msfullscreenchange', () => {
      setFullScreen((val) => {
        return !val;
      });
    });

    setFullScreen(newisFullscreen);
    return () => {
      document.addEventListener('fullscreenchange', () => {
        setFullScreen((val) => {
          return !val;
        });
      });
      document.addEventListener('mozfullscreenchange', () => {
        setFullScreen((val) => {
          return !val;
        });
      });
      document.addEventListener('webkitfullscreenchange', () => {
        setFullScreen((val) => {
          return !val;
        });
      });
      document.addEventListener('msfullscreenchange', () => {
        setFullScreen((val) => {
          return !val;
        });
      });
    };
  }, []);

  const handleFullscreen = () => {
    const main = document.body as any;

    if (isfullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else if (main.requestFullscreen) {
      main.requestFullscreen();
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen();
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen();
    } else if (main.requestFullscreen) {
      main.requestFullscreen();
    }
  };
  console.log('screen', isfullScreen);

  return (
    <>
      {isfullScreen ? (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={handleFullscreen}>
          <MyIcon
            type='icon-fullscreen-exit'
            style={{ fontSize: 14, fontWeight: 'bold' }}
          />
        </div>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={handleFullscreen}>
          <MyIcon
            type='icon-fullscreen'
            style={{ fontSize: 14, fontWeight: 'bold' }}
          />
        </div>
      )}
    </>
  );
};

export default FullScreen;
