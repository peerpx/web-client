import styled from 'styled-components'

export const CenterCard = styled.div`
	height: calc(100vh - 50px);
	overflow-y: scroll;
	display: flex;
`
CenterCard.Content = styled.div`
	width: 400px;
	margin: auto;
	border: 1px solid #eeeff2;
	background: #fff;
	color: #525558;

	padding: 32px 40px 24px;
	border-radius: 3px;
	
	h1{
		font-weight: 200;
	}
	
	.fullWidth{
		width: 100%;
	}
`
