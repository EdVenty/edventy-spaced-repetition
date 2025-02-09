import React from 'react';

import { Card } from './Card';
import { Spacing } from './Spacing';
import { Button } from './Button';
import { Typography } from './Typography';
import { Content } from './Content';
import { Pagination } from './Pagination';
import { Scrollview } from './Scrollview';

export type QuestionHead = {
    title: string;
    status?: 'mastered' | 'practice'
}

export interface QuizCardProps {
  title?: string;
  question?: React.ReactNode;
  answer?: React.ReactNode;
  allQuestions?: QuestionHead[],
  /** Is answer opened. */
  opened?: boolean;
  /** React props of Card.Content */
  contentProps?: React.ComponentProps<typeof Card.Content>;
  /** React props of Card.Sidebar */
  sidebarProps?: React.ComponentProps<typeof Card.Sidebar>;
  /** React props of Scrollview */
  scrollviewProps?: React.ComponentProps<typeof Scrollview>;
  
  /** Page selection callback. */
  onPageSelected?: (page: number) => any;
  /** On answer opens. */
  onOpen?: () => any;
  /** On answer closes */
  onClose?: () => any;
}

export const QuizCard = ({
    title,
    question,
    answer,
    allQuestions,
    opened,
    onPageSelected,
    onOpen,
    onClose,
    contentProps,
    sidebarProps,
    scrollviewProps,
    ...props
}: QuizCardProps & React.HTMLProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    const [answerShown, setAnswerShown] = React.useState(false);
    const [cardHeight, setCardHeight] = React.useState(document.body.scrollHeight);


    React.useEffect(() => {
        const updateHeight = () => {
            console.log("ebat")
            setCardHeight(document.body.scrollHeight * 0.7);
        }

        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        }
    }, []);

    const onAnswerButton = () => {
        if(!(opened ?? answerShown)){
            onOpen?.();
        }
        else{
            onClose?.();
        }
        setAnswerShown(!(opened ?? answerShown));
    }

    return <Card {...props}>
        <Card.Content {...contentProps}>
           <Spacing direction='vertical' justify='space-between' style={{height: '100%'}}>
                <Spacing className='h-full' direction='vertical' spacing={30}>
                    <Scrollview step={100} {...scrollviewProps} style={{maxHeight: '50vh', ...scrollviewProps?.style}}>
                        <Spacing spacing={30} direction='vertical'>
                            <Spacing spacing={30} direction='vertical'>
                                <Spacing spacing={10} direction='vertical'>
                                    <Typography.Paragraph strong>Question:</Typography.Paragraph>
                                    {question}
                                    {/* <Typography.Paragraph data-testid="quiz-question-text" font={26}>{questionText}</Typography.Paragraph> */}
                                </Spacing>
                                {opened ?? answerShown ? <Spacing spacing={10} direction='vertical'>
                                    <Typography.Paragraph strong>Answer:</Typography.Paragraph>
                                    {answer}
                                    {/* <Typography.Paragraph data-testid="quiz-answer-text">{answerText}</Typography.Paragraph> */}
                                </Spacing> : null}
                            </Spacing>
                        </Spacing>
                    </Scrollview>
                    <Spacing>
                        <Button label={opened ?? answerShown ? 'Hide answer' : 'Show answer'} onClick={onAnswerButton}/>
                        <Button label='Mark as mastered' variant='green'/>
                        <Button label='Add to practice' variant='red'/>
                    </Spacing>
                </Spacing>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Pagination size={allQuestions?.length ?? 1} input onChange={(p) => {
                        if(Number.isInteger(p)){
                            onPageSelected?.(p as number);
                        }
                    }}/>
                </div>
            </Spacing>
        </Card.Content>
        {/* <Card.Sidebar float='right' {...sidebarProps}>
            {title ? <Typography.Heading3>{title}</Typography.Heading3> : null}
            <Scrollview>
                <div style={{height: '100%', padding: "20px 30px"}}>
                    <Spacing direction='vertical'>
                        {allQuestions?.map(q => <Spacing>
                            <Typography.Paragraph>{q.title}</Typography.Paragraph>
                        </Spacing>)}
                </Spacing>
                </div>
            </Scrollview>
        </Card.Sidebar> */}
  </Card>;
}

const QuizCardWithMarkdown = ({
    question,
    answer,
    ...props
}: React.ComponentProps<typeof QuizCard>) => {
    return <QuizCard {...props} question={<Content {...Content.DefaultPlugins}>{question?.toString()}</Content>} answer={<Content {...Content.DefaultPlugins}>{answer?.toString()}</Content>} />;
}

QuizCard.WithMarkdown = QuizCardWithMarkdown;