
import { GrClose } from "react-icons/gr";


export default function Modal({ isOpen , setOpenModal }) {

    
  if (isOpen) {
    return (
      <div style={styles.backgroundd}>

        <div style={styles.container}>
            <div style={styles.closeModal} onClick={setOpenModal} ><GrClose /></div>
          <div style={styles.formWrapper}>
            <div style={styles.textCenter}>
              <h1 style={styles.title}>Sua opinião é importante</h1>
              <p style={styles.subtitle}>
                Deixe seu feedback e nos ajude a melhorar nossa plataforma.
              </p>
            </div>
            <form style={styles.form}>
              <div>
                <label htmlFor="rating" style={styles.label}>
                  Como você avalia nossa plataforma?
                </label>
                <div style={styles.buttonGroup}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} type="button" style={styles.button}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" style={styles.label}>
                  Deixe seu comentário
                </label>
                <div style={styles.inputWrapper}>
                  <textarea
                    id="comment"
                    rows={3}
                    style={styles.textarea}
                    placeholder="Escreva seu comentário aqui..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="improvement" style={styles.label}>
                  Deixe um ponto de melhoria
                </label>
                <div style={styles.inputWrapper}>
                  <textarea
                    id="improvement"
                    rows={3}
                    style={styles.textarea}
                    placeholder="Escreva sua sugestão de melhoria aqui..."
                  />
                </div>
                <div style={styles.inputcheckbox}>
                  <label style={styles.label_checkbox}>
                    Deseja se identificar ?
                  </label>
                  <div style={styles.inputcheckbox_Button}>
                    <label htmlFor="Sim" style={styles.label_checkbox}>
                      Sim
                    </label>
                    <input id="Sim" type="checkbox" name="identicicacao" />
                  </div>
                  <div style={styles.inputcheckbox_Button}>
                    <label htmlFor="Nao" style={styles.label_checkbox}>
                      Nao
                    </label>
                    <input id="Nao" type="checkbox" name="identicicacao" />
                  </div>
                </div>
              </div>
              <div>
                <button type="submit" style={styles.submitButton}>
                  Enviar Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  backgroundd: {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgb(0,0,0,0.7)",
    zIndex: "1000",
  },
  container: {
    display: "flex",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "24px",
  },
  closeModal:{
    alignSelf: "end"
  },
  formWrapper: {
    maxWidth: "400px",
    width: "100%",
    marginBottom: "16px",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    marginTop: "8px",
    color: "#777",
  },
  form: {
    marginTop: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#777",
    marginBottom: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
  },
  inputWrapper: {
    marginTop: "8px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderColor: "#ccc",
    borderRadius: "4px",
    resize: "vertical",
  },

  inputcheckbox: {
    display: "flex",
    marginTop: "8px",
    gap: "10px",
    alignItems: 'center'

  },

  inputcheckbox_Button: {
    display: "flex",
    gap: "8px",
  },

  label_checkbox: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#777",
    width: "50%",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    marginTop: "16px",
  },
};
