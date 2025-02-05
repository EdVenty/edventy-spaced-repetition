import React from "react";
import { Card } from "./Card";
import { Spacing } from "./Spacing";
import { Typography } from "./Typography";


export interface QuizPreviewProps {
    title: string;
    size: number;
    author?: string;
    rating?: number;

}

export const QuizPreview = ({
    title,
    size,
    author,
    rating,
    ...props
}: QuizPreviewProps & React.ComponentProps<typeof Card>) => {
    return <Card variant="secondary" {...props} className={["quiz-preview-card", props.className].join(' ')}>
        <Card.Content>
            <Spacing direction="vertical" spacing={0}>
                <Typography.Heading3>{title}</Typography.Heading3>
                <Typography>{size} questions</Typography>
                {author ? <Typography>{author}</Typography> : null}
            </Spacing>
        </Card.Content>
    </Card>
}