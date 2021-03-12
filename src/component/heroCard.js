import React from 'react'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

const HeroCardWrapper = styled.div`
    width: 200px;
    height: 280px;
    border: 1px solid black;
    margin: 40px auto;
    text-align: center;
    img {
        margin-bottom: 24px;
    }
    span {
        font-size: 24px;
    }
`

export const HeroCard = (props) => {
    const { id, name, imgUrl } = props;
    const history = useHistory();
    return (
        <HeroCardWrapper onClick={() => history.push(`/heroes/${id}`)}>
            <img src={imgUrl} alt="Not Found" />
            <span>{name}</span>
        </HeroCardWrapper>
    )
}