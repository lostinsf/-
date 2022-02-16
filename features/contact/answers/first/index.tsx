import { memo, useCallback, useState, ChangeEvent } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IsEqual from 'react-fast-compare';
import { useRecoilState } from 'recoil';
import { questionAtom } from '@lib/recoil';

type AnswerSecondProps = {
  handleNextClick: () => void;
};

function AnswerSecond(props: AnswerSecondProps): JSX.Element {
  const { handleNextClick } = props;
  const [contactState, setContactState] = useRecoilState(questionAtom);
  const [nameProject, setNameProject] = useState<string>();

  const onNameChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNameProject(e.target.value);
  }, []);

  const onNextClick = useCallback((): void => {
    setContactState({
      ...contactState,
      answerFirst: nameProject,
    });

    handleNextClick();
  }, [nameProject]);

  return (
    <Row>
      <Col sm={12} md={11}>
        <textarea
          placeholder="프로젝트명 혹은 사업명을 입력해주세요 First"
          value={nameProject}
          onChange={onNameChange}
        />
      </Col>
      <Col sm={12} md={1}>
        <button type="button" onClick={onNextClick}>
          Click
        </button>
      </Col>
    </Row>
  );
}

export default memo(AnswerSecond, IsEqual);
