import { ListItem, ListItemText } from '@material-ui/core';
import React, {useState} from 'react';
import cn from 'classnames';
import { ProfileCard } from './ProfileCard';

export function TransportList({transport, properties}) {
  const [toggle, setToggle] = useState(false)

  return (
    <ListItem button>
      <ListItemText primary={transport.data.name} onClick={() => setToggle(!toggle)} />
      <div className={cn('modal', {
        'is-active': toggle
      })}>
        <div className="modal-background" onClick={() => setToggle(!toggle)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={() => setToggle(!toggle)}></button>
          </header>
          <section className="modal-card-body">
            <ProfileCard properties={properties} data={transport.data}/>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => setToggle(!toggle)}>Ok</button>
          </footer>
        </div>
      </div>
    </ListItem>
  )
}