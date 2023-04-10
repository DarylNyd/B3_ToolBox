import styled from 'styled-components'

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #327ded;
  height: 100vh;
`

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Container2label = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    width; 16rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  background-color: rgb(255 255 255);
  color: rgb(107 114 128);
  border-radius: 0.5rem;
  letter-spacing: 0.025em;
  text-transform: uppercase;
`
const Container2span = styled.span`
  margin-top: 0.5rem;
  line-height: 1.5;
`
const Container3 = styled.div`
  margin-top: 1.5rem;
`
const Container4 = styled.div`
  margin-top: 1rem;
`
export {
  Container1,
  Container2,
  Container2label,
  Container2span,
  Container3,
  Container4
}
