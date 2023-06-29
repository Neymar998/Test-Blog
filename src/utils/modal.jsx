import { createApp } from 'vue'
import { styled } from '@styils/vue'

//样式
const DivModal = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 101,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
})
const DivModalContent = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '300px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '40px 30px',
})
const P = styled('p', {
    textAlign: 'center'
})
const Button = styled('button', {
    alignSelf: 'center'
})

// 组件
const Modal = {
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    render(ctx) {
        const { $props, $emit } = ctx
        return (
            <DivModal>
                <DivModalContent>
                    <P>{$props.msg}</P>
                    <Button click={$emit('onClick')}>关闭</Button>
                </DivModalContent>
            </DivModal>
        )
    }
}

function modal(msg, clickHandler) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    // 渲染一个组件
    const app = createApp(Modal, {
        msg,
        onClick() {
            clickHandler & clickHandler(() => {
                app.unmount(div)
                div.remove()
            })
        }
    })
    app.mount(div)
}

export default modal
