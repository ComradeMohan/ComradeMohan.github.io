import { useEffect } from "react";

const AnimatedGradientBg = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        25% {
          background-position: 100% 50%;
        }
        50% {
          background-position: 100% 100%;
        }
        75% {
          background-position: 0% 100%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes blobFloat {
        0%, 100% {
          transform: translate(0, 0) scale(1);
        }
        25% {
          transform: translate(30px, -50px) scale(1.1);
        }
        50% {
          transform: translate(-20px, 30px) scale(0.9);
        }
        75% {
          transform: translate(50px, 20px) scale(1.05);
        }
      }

      .animated-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          -45deg,
          #0f172a,
          #1e293b,
          #0f4c75,
          #0f172a
        );
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
        z-index: -1;
      }

      .blob {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%);
        filter: blur(40px);
      }

      .blob-1 {
        width: 400px;
        height: 400px;
        top: -100px;
        left: -100px;
        animation: blobFloat 8s ease-in-out infinite;
      }

      .blob-2 {
        width: 350px;
        height: 350px;
        bottom: -100px;
        right: -100px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0) 70%);
        animation: blobFloat 10s ease-in-out infinite reverse;
      }

      .blob-3 {
        width: 300px;
        height: 300px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0) 70%);
        animation: blobFloat 12s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className="animated-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    </>
  );
};

export default AnimatedGradientBg;
