import styled from 'styled-components'

const LoadingStyle = styled.div`
    font-size: 60px;
    text-align: center;
    margin-top: 200px;
`
export const Loading = () => {
    return (
        <LoadingStyle>Loading...</LoadingStyle>
    )
}