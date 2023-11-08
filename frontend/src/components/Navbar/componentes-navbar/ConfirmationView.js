
const ConfirmationView=({ title, msg , sendCmd , cmd, classIcone})=>{
    return (
        <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="restartModalLabel">{ title }<i className={classIcone} style={{paddingLeft:'7px'}}></i></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {msg}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => sendCmd(cmd)}>OK</button>
                </div>
                </div>
            </div>
    )
}

export default ConfirmationView;