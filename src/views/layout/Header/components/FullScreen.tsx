import * as React from 'react';
import { ShrinkOutlined, ArrowsAltOutlined } from '@ant-design/icons';

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
        console.log('----fullscreenchange---', val);

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
        <ShrinkOutlined onClick={handleFullscreen} />
      ) : (
        <ArrowsAltOutlined onClick={handleFullscreen} />
      )}
    </>
  );
};

export default FullScreen;
