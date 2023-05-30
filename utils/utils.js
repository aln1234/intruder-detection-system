export const drawRect = (detections,ctx) => {
    //Loop through each predictions

    detections.forEach(prediction => {

        //Extract boxees and classes
        const [x,y,width,height] = prediction["bbox"]
        const text = `The object shown is ${prediction.class} with ${Math.round(parseFloat(prediction.score) * 100)}% accuarcy `

        //set styling

        const color ="192a56"
        ctx.strokeStyle ="#192a56"
        ctx.font = '18px Arial'
        ctx.fontWeight="bold"

        //Draw rectangle and text

        ctx.beginPath()
        ctx.fillStyle="#"+color
        ctx.fillText(text,x,y);
        ctx.rect(x,y,width,height);
        ctx.stroke();

    })
}