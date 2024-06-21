

function JsonTemplateDisplay({deviceTypeName, idMapping, loggedAtMapping, lastSeenMapping}){


    return(<>
            <td></td>
            <td>{deviceTypeName}</td>
            <td>{idMapping}</td>
            <td>{loggedAtMapping}</td>
            <td>{lastSeenMapping}</td>
        </>
    )
}

export default JsonTemplateDisplay;