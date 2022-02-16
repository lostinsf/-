import { memo, useState, useEffect, useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { Line } from 'rc-progress';
import { LoadingWrapper, LoadingLogo, LoadingLogoSvg, LoadingLogoPath } from './styles';

type LoadingFullscreenProps = {
  isShow: boolean;
  progressNum: number;
};

function LoadingFullscreen(props: LoadingFullscreenProps): JSX.Element {
  // 기본 선모양
  const { isShow, progressNum } = props;
  const strokeWidth = 4;
  const strokeColor = '#174BFF';

  // 프래임 설정 (onChange 함수 실행시 최대 100 / frameNum 도트 움직임 가능)
  const frameNum = 4;

  // 구김 프레임 설정 (1degree 기준 프레임 출력 / moveDegreeNum 회전 가능)
  const moveDegreeNum = 2;

  // 선 그리기 (path 그림 그리기)
  const [isDrawingLine, setIsDrawingLine] = useState<boolean>(false);

  // 화면 돌리기 (아래쪽으로 30도 더 돌림)
  const [isRotate, setIsRotate] = useState<boolean>(false);

  // 보간점 및 라디안 계산준비
  const quadBezier = (A: number, B: number, C: number, t: number): number => {
    if (t === 0) {
      return A;
    }

    if (t === 1) {
      return C;
    }

    const s = 1 - t;

    // (s²)A + 2(st)B + (t²)C
    return Math.floor(s * s * A + 2 * (s * t) * B + t * t * C);
  };
  const degreesToRadians = Math.PI / 180;

  // 사각형 패스 모션 상수( (상태: 접은상태 -> 펴기상태로 전환하여 초기화 / 모션: 펴기)
  const rectPointX1 = 181;
  const rectPointY1 = 130;
  const rectPointX2 = 238;
  const rectPointY2 = 130;
  const rectStaticPointX1 = 140;
  const rectStaticPointY1 = 218;
  const rectStaticPointX2 = 130;
  const rectStaticPointY2 = 177;
  const rectDegreesNum = (rectStaticPointY2 - rectStaticPointY1) / (rectStaticPointX2 - rectStaticPointX1);
  const rectConstNum = rectStaticPointY2 - rectDegreesNum * rectStaticPointX2;
  const rectReverseDegreesNum = -1 / rectDegreesNum;
  const rectReverseConstNum1 = rectPointY1 - rectReverseDegreesNum * rectPointX1;
  const rectReverseConstNum2 = rectPointY2 - rectReverseDegreesNum * rectPointX2;
  const rectMatchPointX1 = Math.floor((rectConstNum - rectReverseConstNum1) / (rectReverseDegreesNum - rectDegreesNum));
  const rectMatchPointY1 = Math.floor(rectDegreesNum * rectMatchPointX1 + rectConstNum);
  const rectMatchPointX2 = Math.floor((rectConstNum - rectReverseConstNum2) / (rectReverseDegreesNum - rectDegreesNum));
  const rectMatchPointY2 = Math.floor(rectDegreesNum * rectMatchPointX2 + rectConstNum);
  const rectStopPointX1 = Math.floor(2 * rectMatchPointX1 - rectPointX1);
  const rectStopPointY1 = Math.floor(rectReverseDegreesNum * rectStopPointX1 + rectReverseConstNum1);
  const rectStopPointX2 = Math.floor(2 * rectMatchPointX2 - rectPointX2);
  const rectStopPointY2 = Math.floor(rectReverseDegreesNum * rectStopPointX2 + rectReverseConstNum2);
  const rectCurveDistanceNum = 25; // 커브 최상점 거리 측정
  const rectCurvePointX1 = Math.floor(rectMatchPointX1 + rectCurveDistanceNum * Math.cos(90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요
  const rectCurvePointY1 = Math.floor(rectMatchPointY1 + rectCurveDistanceNum * Math.sin(90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요
  const rectCurvePointX2 = Math.floor(rectMatchPointX2 + rectCurveDistanceNum * Math.cos(90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요
  const rectCurvePointY2 = Math.floor(rectMatchPointY2 + rectCurveDistanceNum * Math.sin(90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요

  // 사각형 패스 모션 변수
  const [tnum1, setTnum1] = useState<number>(0);
  const [tnum2, setTnum2] = useState<number>(0);
  const [rectMoveReversePointX1, setRectMoveReversePointX1] = useState<number>(rectStopPointX1);
  const [rectMoveReversePointY1, setRectMoveReversePointY1] = useState<number>(
    rectStopPointX1 * rectReverseDegreesNum + rectReverseConstNum1,
  );
  const [rectMoveReversePointX2, setRectMoveReversePointX2] = useState<number>(rectStopPointX2);
  const [rectMoveReversePointY2, setRectMoveReversePointY2] = useState<number>(
    rectStopPointX2 * rectReverseDegreesNum + rectReverseConstNum2,
  );

  const onRectMoveReversePointChange = useCallback((): boolean => {
    if (rectMoveReversePointX1 < rectPointX1) {
      setTnum1(tnum1 + frameNum);
      if (tnum1 > 100) {
        setTnum1(100);
      }
      // 2차 곡선 베지에 드로잉 작업
      setRectMoveReversePointX1(quadBezier(rectStopPointX1, rectCurvePointX1, rectPointX1, tnum1 * 0.01));
      setRectMoveReversePointY1(quadBezier(rectStopPointY1, rectCurvePointY1, rectPointY1, tnum1 * 0.01));
    }
    if (rectMoveReversePointX2 < rectPointX2) {
      setTnum2(tnum2 + frameNum);
      if (tnum2 > 100) {
        setTnum2(100);
      }
      // 2차 곡선 베지에 드로잉 작업
      setRectMoveReversePointX2(quadBezier(rectStopPointX2, rectCurvePointX2, rectPointX2, tnum2 * 0.01));
      setRectMoveReversePointY2(quadBezier(rectStopPointY2, rectCurvePointY2, rectPointY2, tnum2 * 0.01));
      return false;
    }
    return true;
  }, [tnum1, tnum2, rectMoveReversePointX1, rectMoveReversePointY1, rectMoveReversePointX2, rectMoveReversePointY2]);

  // 삼각형 패스 모션 상수(상태: 접은상태 -> 펴기상태로 전환하여 초기화 / 모션: 펴기)
  const tryPointX = 210;
  const tryPointY = 260;
  const tryStaticPointX1 = 260;
  const tryStaticPointY1 = 218;
  const tryStaticPointX2 = 210;
  const tryStaticPointY2 = 177;
  const tryDegreesNum = (tryStaticPointY2 - tryStaticPointY1) / (tryStaticPointX2 - tryStaticPointX1);
  const tryConstNum = tryStaticPointY2 - tryDegreesNum * tryStaticPointX2;
  const tryReverseDegreesNum = -1 / tryDegreesNum;
  const tryReverseConstNum = tryPointY - tryReverseDegreesNum * tryPointX;
  const tryMatchPointX = (tryConstNum - tryReverseConstNum) / (tryReverseDegreesNum - tryDegreesNum);
  const tryMatchPointY = tryDegreesNum * tryMatchPointX + tryConstNum;
  const tryStopPointX = Math.floor(2 * tryMatchPointX - tryPointX);
  const tryStopPointY = Math.floor(tryReverseDegreesNum * tryStopPointX + tryReverseConstNum);
  const tryCurveDistanceNum = 25; // 커브 최상점 거리 측정
  const tryCurvePointX = Math.floor(tryMatchPointX + tryCurveDistanceNum * Math.cos(-90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요
  const tryCurvePointY = Math.floor(tryMatchPointY + tryCurveDistanceNum * Math.sin(-90 * degreesToRadians)); // 커브 위치에 따라 degree 수정 필요

  // 삼각형 패스 모션 변수
  const [tnum3, setTnum3] = useState<number>(0);
  const [tryMoveReversePointX, setTryMoveReversePointX] = useState<number>(tryStopPointX);
  const [tryMoveReversePointY, setTryMoveReversePointY] = useState<number>(
    tryStopPointX * tryReverseDegreesNum + tryReverseConstNum,
  );
  const onTryMoveReversePointChange = useCallback((): boolean => {
    if (tryMoveReversePointX > tryPointX) {
      setTnum3(tnum3 + frameNum);
      if (tnum3 > 100) {
        setTnum3(100);
      }
      // 2차 곡선 베지에 드로잉 작업
      setTryMoveReversePointX(quadBezier(tryStopPointX, tryCurvePointX, tryPointX, tnum3 * 0.01));
      setTryMoveReversePointY(quadBezier(tryStopPointY, tryCurvePointY, tryPointY, tnum3 * 0.01));
      return false;
    }
    return true;
  }, [tnum3, tryMoveReversePointX, tryMoveReversePointY]);

  // SVG 구김 모션
  const shrinkRectDistanceNum1 = Math.floor(
    Math.sqrt(
      (rectStopPointX1 - rectStaticPointX2) * (rectStopPointX1 - rectStaticPointX2) +
        (rectStopPointY1 - rectStaticPointY2) * (rectStopPointY1 - rectStaticPointY2),
    ),
  );
  const shrinkRectDistanceNum2 = Math.floor(
    Math.sqrt(
      (rectStopPointX2 - rectStaticPointX1) * (rectStopPointX2 - rectStaticPointX1) +
        (rectStopPointY2 - rectStaticPointY1) * (rectStopPointY2 - rectStaticPointY1),
    ),
  );
  const shrinkTryDistanceNum = Math.floor(
    Math.sqrt(
      (tryStopPointX - tryStaticPointX2) * (tryStopPointX - tryStaticPointX2) +
        (tryStopPointY - tryStaticPointY2) * (tryStopPointY - tryStaticPointY2),
    ),
  );
  const stopRectDegree =
    360 - Math.floor(Math.acos((rectStopPointX1 - rectStaticPointX2) / shrinkRectDistanceNum1) / degreesToRadians);
  const startRectDegree = 180;
  const stopTryDegree =
    0 - Math.floor(Math.acos((tryStopPointX - tryStaticPointX2) / shrinkTryDistanceNum) / degreesToRadians);
  const startTryDegree = 0;

  const [shrinkRectDegree, setShrinkRectDegree] = useState<number>(startRectDegree);
  const [shrinkRectMovePointX1, setShrinkRectMovePointX1] = useState<number>(
    Math.floor(rectStaticPointX2 + shrinkRectDistanceNum1 * Math.cos(shrinkRectDegree * degreesToRadians)),
  );
  const [shrinkRectMovePointY1, setShrinkRectMovePointY1] = useState<number>(
    Math.floor(rectStaticPointY2 + shrinkRectDistanceNum1 * Math.sin(shrinkRectDegree * degreesToRadians)),
  );
  const [shrinkRectMovePointX2, setShrinkRectMovePointX2] = useState<number>(
    Math.floor(rectStaticPointX1 + shrinkRectDistanceNum2 * Math.cos(shrinkRectDegree * degreesToRadians)),
  );
  const [shrinkRectMovePointY2, setShrinkRectMovePointY2] = useState<number>(
    Math.floor(rectStaticPointY1 + shrinkRectDistanceNum2 * Math.sin(shrinkRectDegree * degreesToRadians)),
  );
  const [shrinkTryDegree, setShrinkTryDegree] = useState<number>(startTryDegree);
  const [shrinkTryMovePointX, setShrinkTryMovePointX] = useState<number>(
    Math.floor(tryStaticPointX2 + shrinkTryDistanceNum * Math.cos(shrinkTryDegree * degreesToRadians)),
  );
  const [shrinkTryMovePointY, setShrinkTryMovePointY] = useState<number>(
    Math.floor(tryStaticPointY2 + shrinkTryDistanceNum * Math.sin(shrinkTryDegree * degreesToRadians)),
  );
  const onShrinkMoveReversePointChange = useCallback((): boolean => {
    if (shrinkRectDegree < stopRectDegree) {
      setShrinkRectDegree(shrinkRectDegree + moveDegreeNum);
      setShrinkRectMovePointX1(
        Math.floor(rectStaticPointX2 + shrinkRectDistanceNum1 * Math.cos(shrinkRectDegree * degreesToRadians)),
      );
      setShrinkRectMovePointY1(
        Math.floor(rectStaticPointY2 + shrinkRectDistanceNum1 * Math.sin(shrinkRectDegree * degreesToRadians)),
      );
      setShrinkRectMovePointX2(
        Math.floor(rectStaticPointX1 + shrinkRectDistanceNum2 * Math.cos(shrinkRectDegree * degreesToRadians)),
      );
      setShrinkRectMovePointY2(
        Math.floor(rectStaticPointY1 + shrinkRectDistanceNum2 * Math.sin(shrinkRectDegree * degreesToRadians)),
      );
    }
    if (shrinkTryDegree > stopTryDegree) {
      setShrinkTryDegree(shrinkTryDegree - moveDegreeNum);
      setShrinkTryMovePointX(
        Math.floor(tryStaticPointX2 + shrinkTryDistanceNum * Math.cos(shrinkTryDegree * degreesToRadians)),
      );
      setShrinkTryMovePointY(
        Math.floor(tryStaticPointY2 + shrinkTryDistanceNum * Math.sin(shrinkTryDegree * degreesToRadians)),
      );
    }
    return true;
  }, [
    shrinkRectDegree,
    shrinkRectMovePointX1,
    shrinkRectMovePointY1,
    shrinkRectMovePointX2,
    shrinkRectMovePointY2,
    shrinkTryDegree,
    shrinkTryMovePointX,
    shrinkTryMovePointY,
  ]);

  useEffect(() => {
    // 공통
    const id1 = setInterval(() => {
      if (progressNum > 0) {
        onShrinkMoveReversePointChange();
      }
      if (progressNum > 20) {
        setIsDrawingLine(true);
      }
      if (progressNum > 40) {
        onRectMoveReversePointChange();
      }
      if (progressNum > 60) {
        setIsRotate(true);
      }
      if (progressNum > 80) {
        onTryMoveReversePointChange();
      }
    }, 25);
    return () => clearInterval(id1);
  }, [
    isDrawingLine,
    isRotate,
    progressNum,
    rectMoveReversePointX1,
    rectMoveReversePointY1,
    rectMoveReversePointX2,
    rectMoveReversePointY2,
    tryMoveReversePointX,
    tryMoveReversePointY,
  ]);

  return (
    <LoadingWrapper key="loadingWarpper1" isShow={isShow}>
      {isShow && (
        <>
          <LoadingLogo key="LoadingLogo1">
            <LoadingLogoSvg
              key="LoadingLogoSvg1"
              xmlns="http://www.w3.org/2000/svg"
              width="390"
              height="390"
              viewBox="0 0 390 390"
              fill="none"
              isRotate={isRotate}
              isDrawingLine={isDrawingLine}>
              {isDrawingLine && (
                <LoadingLogoPath
                  key="LoadingLogoPath1"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={`M${rectStaticPointX2} ${rectStaticPointY2}L${rectMoveReversePointX1} ${rectMoveReversePointY1}
                L${rectMoveReversePointX2} ${rectMoveReversePointY2}L${rectStaticPointX1} ${rectStaticPointY1}Z`}
                />
              )}
              {!isDrawingLine && (
                <LoadingLogoPath
                  key="LoadingLogoPath1"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={`M${rectStaticPointX2} ${rectStaticPointY2}L${shrinkRectMovePointX1} ${shrinkRectMovePointY1}
                M${shrinkRectMovePointX2} ${shrinkRectMovePointY2}L${rectStaticPointX1} ${rectStaticPointY1}
                M${shrinkRectMovePointX1} ${shrinkRectMovePointY1}L${shrinkRectMovePointX2} ${shrinkRectMovePointY2}Z`}
                />
              )}
              <LoadingLogoPath
                key="LoadingLogoPath2"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                stroke-linecap="round"
                stroke-linejoin="round"
                d={`M${tryStaticPointX1} ${tryStaticPointY1}L${rectStaticPointX1} ${rectStaticPointY1}
                M${rectStaticPointX2} ${rectStaticPointY2}L${tryStaticPointX2} ${tryStaticPointY2}Z`}
              />
              {isDrawingLine && (
                <LoadingLogoPath
                  key="LoadingLogoPath3"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={`M${tryStaticPointX2} ${tryStaticPointY2}L${tryMoveReversePointX} ${tryMoveReversePointY} L${tryStaticPointX1} ${tryStaticPointY1}Z`}
                />
              )}
              {!isDrawingLine && (
                <LoadingLogoPath
                  key="LoadingLogoPath3"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d={`M${shrinkTryMovePointX} ${shrinkTryMovePointY}L${tryStaticPointX1} ${tryStaticPointY1}
                  M${shrinkTryMovePointX} ${shrinkTryMovePointY}L${tryStaticPointX2} ${tryStaticPointY2}Z`}
                />
              )}
            </LoadingLogoSvg>
          </LoadingLogo>
          <Line
            key="Line1"
            className="loadingLogoLine"
            percent={progressNum}
            strokeWidth={1}
            strokeColor={strokeColor}
            trailColor="#D8D8D8"
          />
        </>
      )}
    </LoadingWrapper>
  );
}

export default memo(LoadingFullscreen, IsEqual);
