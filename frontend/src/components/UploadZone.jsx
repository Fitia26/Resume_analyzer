import { useDropzone } from 'react-dropzone'

const UploadZone = ({file, setFile}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
        // first file
        setFile(acceptedFiles[0])
    },
    accept: {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  })

  if (file) {
    return (
        <div className="file-pill">
        <div className="file-pill-ico">📄</div>
        <div>
          <div className="file-pill-name">{file.name}</div>
          <div className="file-pill-meta">
            {(file.size / 1024).toFixed(0) } KB · Ready to analyze
          </div>
        </div>
        <button
          className="file-pill-remove"
          onClick={() => setFile(null)}
        >
          ✕
        </button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${ isDragActive ? 'dropzone-active' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="dropzone-icon">☁️</div>
      <div className="dropzone-title">Drop your resume here</div>
      <div className="dropzone-sub">
        or click to browse · PDF, DOCX · max 10 MB
      </div>
      <div className="dropzone-formats">
        <span className="format-badge">PDF</span>
        <span className="format-badge">DOCX</span>
      </div>
    </div>
  )
}

export default UploadZone
