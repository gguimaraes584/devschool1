import { Container } from './styled'


export default function Index() {
    return (
        <Container>
            <div class="reader-right-box">
                <div class="box-user"> 
                    <div class="user-image">
                        <img src="./assets/images/gui.jpg" alt="" />
                        <div class="absolute">3</div>
                    </div>
                    <div class="user-name"> Olá <b>, Gui </b> </div>
                </div>

                <div class="box-image">
                    <div class="refresh-button"> <button> <img src="./assets/images/recarregar.svg" width="25px" />
  </button> </div>
                    <div class="left-button"> <button> <img src="./assets/images/exit.svg" width="25px" color="white" />  </button> </div>
                </div>
            </div>
            <div class="bottom-bar-right-header" />
        </Container>
    )
}

