import React, { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteFormProps, Tag } from "../hooks/types";
import { v4 as uuidV4} from "uuid"



const NoteForm = ({ onSubmit,onAddTag,availableTags, title="", markdown="", tags=[] }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate(); 

  function handleNoteSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..")
  }

  return (
    <Form onSubmit={handleNoteSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={ label =>{
                  const newTag = {id: uuidV4(), label}
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag?.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag?.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag?.label, id: tag?.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control required defaultValue={markdown} ref={markdownRef} as="textarea" rows={20} />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={3}
            className="my-2 justify-content-end"
          >
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Row>
      </Stack>
    </Form>
  );
};

export default NoteForm;
