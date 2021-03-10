/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import styles from './innovator-section.module.css';
import styleUtils from './utils.module.css';
import Modal from './modal';

export default function InnovatorSection({ innovator }) {
  const router = useRouter();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) {
      router.push('/expo');
    }
  }, [active]);

  console.log(innovator)

  return (
    <Modal active={active} setActive={setActive} large>
      <div className={styles.container}>
        <div className={styles.overlay}>
          <img className={styles.image} src={innovator.image.url} alt={innovator.image.alt} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{innovator.company}</h2>
          <p className={styles.body}>{innovator.bio}</p>
          <a className={styles.button} href={innovator.website} rel="noopener noreferrer" target="_blank">
            Visit Website
          </a>
        </div>
      </div>
    </Modal>
  );
}
