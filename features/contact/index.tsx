import { Line } from 'rc-progress';
import { memo, useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Scrollbars } from 'react-custom-scrollbars-2';
import IsEqual from 'react-fast-compare';
import { AnswerFirst, AnswerSecond } from './answers';
import { QuestionFirst, QuestionSecond } from './questions';
import { BottomContainer, ContactWrapper, TopContainer } from './styles';

function Contact(): JSX.Element {
  const [step, setStep] = useState<number>(1);

  const handleNextClick = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const renderAnswer = useCallback((): JSX.Element => {
    if (step === 2) {
      return <AnswerSecond handleNextClick={handleNextClick} />;
    }

    return <AnswerFirst handleNextClick={handleNextClick} />;
  }, [step]);

  return (
    <ContactWrapper>
      <Scrollbars>
        <TopContainer>
          <Container className="pb-4">
            {step > 0 && <QuestionFirst isShow={step > 0} />}
            {step > 1 && <QuestionSecond isShow={step > 1} />}
          </Container>
        </TopContainer>
      </Scrollbars>
      <>
        <Line percent={10} strokeWidth={1} strokeColor="#fcf012" trailColor="rgba(255, 255, 255, 0.5)" />
        <BottomContainer className="py-4">
          <Container>{renderAnswer()}</Container>
        </BottomContainer>
      </>
    </ContactWrapper>
  );
}

export default memo(Contact, IsEqual);
