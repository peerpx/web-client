import styled from 'styled-components'

export const HeaderWrapper = styled.header`
	color: #b4cac7;
	background: #192a3a;
	display: flex;
	width: 100%;
	height: 50px;
	
	& > div{
		padding: 0 5px;
		align-self: center;
	}
	
	a{
		color: #b4cac7;
	}
`

export const HeaderLeft = styled.div`
	flex: 1 0 auto;
	
	.logo{
		font-size: 1.5em;
	}
`
export const HeaderRight = styled.div`

	ul{
		margin: 0;
	}
	
	li{
		display: inline-block;
		list-style-type: none;
		margin-left: 10px;
	}
`