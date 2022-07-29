import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '../../../../services/api';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import img from '../../../../assets/empty.png'

export default function AvatarInput({ id, setUpAvatar }) {
  const { defaultValue, registerField } = useField('avatar');
  const { avatar } = useSelector((state) => state.product.form);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    if (id && avatar) {
      setFile(avatar.id);
      setPreview(avatar.url);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, id, ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img id="avatar-img" src={preview || img} alt="Img Produto" />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
        <h4>Imagem do produto</h4>
      </label>
    </Container>
  );
}
