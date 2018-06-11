import styled from 'styled-components'

export const Centered = styled.div`
	min-height: calc(100vh - 50px);
	overflow-y: scroll;
`
Centered.Content = styled.div`
	width: 900px;
	margin: auto;
	background: #bada55;
	
	.fullWidth{
		width: 100%;
	}
`

export default Centered