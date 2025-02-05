import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

import { Card } from "./Card";
import { Spacing } from "./Spacing";
import { Divider } from "./Divider";
import { Typography } from "./Typography";


export const mockParagraphShort = <Typography>Example text.</Typography>;
export const mockParagraph1 = <Typography>One</Typography>;
export const mockParagraph2 = <Typography>Two</Typography>;
export const mockParagraph3 = <Typography>Three</Typography>;

export const mockCardContent = <Card.Content><Typography>Card content</Typography></Card.Content>;
export const mockCardSidebar = <Card.Sidebar float="right"><Typography>Card sidebar</Typography></Card.Sidebar>;
export const mockCardSidebarDivided = <Card.Sidebar float="right">
    <Spacing divider={<Divider />} direction="vertical">
        <Typography>One</Typography>
        <Typography>Two</Typography>
        <Typography>Three</Typography>
    </Spacing>
</Card.Sidebar>;

export const mockSpacingContentVertical = <Spacing direction="vertical">
    {mockParagraph1}
    {mockParagraph2}
    {mockParagraph3}
</Spacing>;

export const mockSpacingContentHorizontal = <Spacing direction="horizontal">
    {mockParagraph1}
    {mockParagraph2}
    {mockParagraph3}
</Spacing>;

export const mockIcon = <FontAwesomeIcon icon={faPenNib}/>;