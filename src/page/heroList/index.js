import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HeroCard } from '../../component/heroCard';
import { Loading } from '../../component/loading';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/action/global';

const HeroWrapper = styled.div`
    width: 80vw;
    margin: 40px auto;
    display: flex;
    text-align: center;
    flex-wrap: wrap;
`

export const Hero = () => {
    const dispatch = useDispatch();
    const [heroList, setHeroList] = useState([])

    useEffect(() => {
        dispatch(setLoading(true));
        fetch(`https://hahow-recruit.herokuapp.com/heroes`)
        .then(response => response.json())
        .then(response => {
            setHeroList([...response]);
            localStorage.setItem('hero', JSON.stringify(response));
            dispatch(setLoading(false))
        }).catch(error => {
            console.log(`Fail to fetch API, error message: ${error}`)
        });
    }, [dispatch])

    const isLoading = useSelector(store => store.global.isLoading);

    return ( isLoading ? <Loading /> :
        <HeroWrapper>
            {
                heroList.map((value, key) => {
                    return (
                        <HeroCard
                            key={key}
                            id={value.id}
                            name={value.name}
                            imgUrl={value.image}
                        ></HeroCard>
                    )
                })
            }
        </HeroWrapper>
    )
}