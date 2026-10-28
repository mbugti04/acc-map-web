import { useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function ReportForm({ position, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const titleRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await axios.post('/api/locations', {
        latitude: position[0],
        longitude: position[1],
        marker_title: title.trim(),
        marker_description: description.trim(),
      });
      onCreated(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit the report. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Modal show={position !== null} onHide={onClose} onEntered={() => titleRef.current?.focus()} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Report an obstacle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {position && (
            <p className="text-muted small">
              Location: {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </p>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3" controlId="reportTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={titleRef}
              required
              maxLength={120}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Broken curb ramp"
            />
          </Form.Group>
          <Form.Group controlId="reportDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              maxLength={2000}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What is the obstacle, and is there a way around it?"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={submitting || !title.trim()}>
            {submitting ? 'Submitting…' : 'Submit report'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ReportForm;
