import { createApp } from 'vue'
import { styled } from '@styils/vue'
import { keyframes } from '@styils/vue'

const myLoad = {
    props: ['msg'],
    render(ctx) {
        const { $props } = ctx
        return (
            <DivLoading>
                <div>
                    <Span></Span>
                    <P>{ $props.msg }</P>
                </div>
            </DivLoading>
        )
    }
}
const DivLoading = styled('div', {
    top: 0,
    zIndex: 101,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})
const spin = keyframes({
    to: {
        transform: 'rotateZ(360deg)'
    }
})
const Span = styled('span',{
    display: 'block',
    width: '60px',
    height: '60px',
    border: '3px solid transparent',
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderRadius: '50%',
    animation: `${spin} ease 1000ms infinite`,
})
const P = styled('p',{
    color:"#fff",
    marginTop: '20px',
})

const div = document.createElement('div')
document.body.appendChild(div)

let app

const load = {
    show(msg) {
        app = createApp(myLoad, { msg })
        app.mount(div)
    },

    hide() {
        app.unmount(div)
        div.remove()
    }
}
export { load }