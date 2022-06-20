import React, { useRef, useState } from "react";
import { ColorResult, ChromePicker } from "react-color";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import Style from "./gradation.module.css";

type Props = {
  wrapperWidthPer: number;
};

const GradationComponent = (props: Props) => {
  const wrapperWidth = props.wrapperWidthPer / 100;

  // state
  const [hexstart, setHexStart] = useState("#FC9B2A");
  const [hexend, setHexEnd] = useState("#F23B3B");
  const [midpoint, setMidPoint] = useState("50%");

  let gradation =
    "linear-gradient(to right," +
    hexstart +
    "," +
    midpoint +
    "," +
    hexend +
    ")";
  const handleColorChangeStart = (color: ColorResult) => {
    setHexStart(color.hex);
  };
  const handleColorChangeEnd = (color: ColorResult) => {
    setHexEnd(color.hex);
  };

  const gradationPadding = 10;
  const barWidth = 20;
  const barPositionAdjustment = gradationPadding * 2 + barWidth;
  const firstGradationWidth = Math.ceil(
    document.body.offsetWidth * wrapperWidth
  );
  //グラデーションエリアの左端からの相対的な最小/最大位置（調整バーの左端にあたる位置）
  let maxPosition = firstGradationWidth - barPositionAdjustment;
  const minPosition = gradationPadding * 2 - barWidth;

  let useWidth = firstGradationWidth - barPositionAdjustment; //調整バーの左端が計算に使う実質の横幅

  const gradationWidth = useRef<HTMLInputElement>(null);
  if (gradationWidth.current) {
    useWidth = gradationWidth.current.offsetWidth - barPositionAdjustment;
    maxPosition = gradationWidth.current.offsetWidth - barPositionAdjustment;
  }

  //graggable
  const [currentX, setCurrentX] = useState(firstGradationWidth / 2 - barWidth);
  const barDrag = (event: DraggableEvent, data: DraggableData) => {
    if (event) {
      //ESlintのエラー回避のためとりあえずifで有無判定…後でちゃんと調べる
      const currentPer = Math.floor((data.x / useWidth) * 100);
      setMidPoint(currentPer + "%");
      if (currentPer === 100) {
        setCurrentX(maxPosition);
      }
      if (currentPer === 0) {
        setCurrentX(minPosition);
      }
    }
  };

  //click
  const gradationClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const whiteSpace = (document.body.offsetWidth * (1 - wrapperWidth)) / 2; //要素両端のpaddingの片方
    let relativePosition = event.clientX - whiteSpace - barWidth; //要素から見た相対位置を本当は一発で取りたい
    let relativePer = Math.floor((relativePosition / useWidth) * 100);
    if (relativePer > 100) {
      relativePer = 100;
    }
    if (relativePer < 0) {
      relativePer = 0;
    }
    if (relativePosition > maxPosition) {
      relativePosition = maxPosition;
    }
    if (relativePosition < minPosition) {
      relativePosition = minPosition;
    }
    setMidPoint(relativePer + "%");
    setCurrentX(relativePosition);
  };
  return (
    <article>
      <code className={Style.code}>
        background: linear-gradient(to right,{hexstart},{midpoint},{hexend})
      </code>
      <div
        ref={gradationWidth}
        onClick={gradationClick}
        className={Style.gradation}
        style={{
          padding: gradationPadding + "px",
          background: gradation,
        }}
      >
        <Draggable
          onDrag={barDrag}
          bounds="parent"
          axis="x"
          position={{
            x: currentX,
            y: 0,
          }}
        >
          <div
            className={Style.bar}
            style={{
              width: barWidth + "px",
            }}
          ></div>
        </Draggable>
      </div>
      <div className={Style.colorpicker}>
        <div>
          <p>
            <span
              style={{
                color: hexstart,
              }}
            >
              start color
            </span>
          </p>
          <ChromePicker color={hexstart} onChange={handleColorChangeStart} />
        </div>
        <div>
          <p>
            <span
              style={{
                color: hexend,
              }}
            >
              end color
            </span>
          </p>
          <ChromePicker color={hexend} onChange={handleColorChangeEnd} />
        </div>
      </div>
    </article>
  );
};

export default GradationComponent;
