import styled, { css } from "styled-components"

export const flexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flexColCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const flexRowStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const flexColStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const flexRowSpace = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const flexColSpace = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const textSecondaryFont = css`
  font-family: "Markazi Text", serif;
  font-weight: normal;
  font-size: 20px;
`

export const textMainFont = css`
  font-family: -apple-system, BlinkMacSystemFont, "Poiret One", cursive,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 600;
`
export const Button = styled.button`
  ${textMainFont};
  width: 100%;
  height: 10%;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
`

export const ButtonAlt = styled.button`
  ${textMainFont};
  width: 100px;
  height: 40px;
  outline: none;
  margin: 5px;
  border-radius: 5px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 1px 1px 5px #878787, -1px -1px 5px #ffffff;
  &:hover {
    box-shadow: 2px 2px 5px #6b6b6b, -2px -2px 5px #ffffff;
  }
`

export const InvalidStrong = styled.strong`
  color: red;
`

export const ValidStrong = styled.strong`
  color: green;
`

export const ContainerDiv = styled.div`
  ${flexColCenter};
  width: 100%;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 13px #6b6b6b, -5px -5px 13px #ffffff;
  padding: 20px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const RowCenterDiv = styled.div`
${flexRowCenter};
align-items: flex-start;
width:100%;
`
export const RowSpaceDiv = styled.div`
${flexRowSpace};
align-items: flex-start;
width:100%;
`

export const ColDiv = styled.div`
${flexColCenter};
width:100%;
`

export const TitleDiv = styled.div`
${flexRowCenter};
${textMainFont};
justify-content:flex-start;
border-top: 1px inset grey;
border-bottom: 2px outset grey;
width:100%;
padding:5px;
font-size:35px;
margin-bottom:40px;

`
export const PicThumbnailContainerDiv = styled.div`
  ${flexRowCenter};
  width: 100%;
  height: 80%;
  flex-wrap: wrap;
`
