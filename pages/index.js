import React, { useRef, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { loadShader, createProgram, switchShader, initAttribute, initBuffer } from '../lib/glu.js'

const Home = () => {
    const canvRef = useRef()
    const frameRef = useRef()
    const byteSize = Float32Array.BYTES_PER_ELEMENT

    const init = async () => {
        const { innerWidth: width, innerHeight: height, devicePixelRatio: dpr } = window
        canvRef.current.width = width * dpr
        canvRef.current.height = height * dpr

        const gl = canvRef.current.getContext('webgl', { preserveDrawingBuffer: false })
        gl.viewport(0, 0, width * dpr, height * dpr)

        const vertShader = await loadShader(gl, gl.VERTEX_SHADER, './vert.glsl')
        const fragShader = await loadShader(gl, gl.FRAGMENT_SHADER, './frag.glsl')
        const program = createProgram(gl, vertShader, fragShader)
        switchShader(gl, program)

        const pos = [-1, -1, -1, 1, 1, -1, 1, 1]
        const buffer = initBuffer(gl, new Float32Array(pos), gl.STATIC_DRAW)

        const aPosition = initAttribute(gl, 'aPosition', 2, 2, 0, false, byteSize)
        const uTime = gl.getUniformLocation(gl.program, 'uTime')
        gl.uniform2f(gl.getUniformLocation(gl.program, 'uDimensions'), width, height)

        const draw = time => {
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
            gl.uniform1f(uTime, time*.001)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            frameRef.current = window.requestAnimationFrame(draw)
        }
        frameRef.current = window.requestAnimationFrame(draw)
    }

    let initalized = false
    useEffect(() => {
        if (!initalized) {
            init()
            initalized = true
        }
        return () => window.cancelAnimationFrame(frameRef.current)
    }, [])

    return (
        <canvas ref={canvRef}></canvas>
    )
}

export default Home
