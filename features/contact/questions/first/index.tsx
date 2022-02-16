import { memo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import IsEqual from 'react-fast-compare';
import { useRecoilValue } from 'recoil';
import { questionAtom } from '@lib/recoil';
import { easeTransition } from '@lib/styles';

type QuestionFirstProps = {
  isShow: boolean;
};

function QuestionFirst(props: QuestionFirstProps): JSX.Element {
  const { isShow } = props;
  const contactState = useRecoilValue(questionAtom);

  return (
    <Row css={easeTransition(isShow)}>
      <Col sm={12} md={1}>
        01.
      </Col>
      <Col sm={12} md={11}>
        <h1>어떤 프로젝트를 문의하고 싶으신가요?</h1>
        <p>(중복 선택이 가능합니다.)</p>
      </Col>
      {contactState.answerFirst && <p>{contactState.answerFirst}</p>}
    </Row>
  );
}

export default memo(QuestionFirst, IsEqual);
