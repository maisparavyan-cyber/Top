import React, { Component } from 'react';
import { IoClose } from "react-icons/io5";

export class ShowFullitem extends Component {
  state = { particles: [] };

  createParticles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const count = 120; // количество частиц
    const newParticles = Array.from({ length: count }).map(() => {
      const size = Math.random() * 12 + 8;
      const dx = (Math.random() - 0.5) * window.innerWidth * 1.5;
      const dy = (Math.random() - 0.5) * window.innerHeight * 1.5;
      const rotation = Math.random() * 360;
      const color = `hsl(${Math.random() * 360}, 80%, 60%)`;

      return {
        id: Math.random(),
        x,
        y,
        size,
        rotation,
        color,
        type: 'heart',
        dxStart: 0,
        dyStart: 0,
        dxMid: dx * 0.4,
        dyMid: dy * 0.4,
        dxMid2: dx * 0.7,
        dyMid2: dy * 0.7,
        dxEnd: dx,
        dyEnd: dy,
      };
    });

    this.setState(prev => ({ particles: [...prev.particles, ...newParticles] }));

    setTimeout(() => {
      this.setState(prev => ({
        particles: prev.particles.filter(p => !newParticles.includes(p))
      }));
    }, 2000);
  };

  render() {
    const { item, onShowItem, onAdd } = this.props;
    const { particles } = this.state;

    return (
      <div className='full-item'>
        <div>
          <IoClose
            className="close"
            onClick={() => onShowItem(null)}
          />

          <div
            className="img-container"
            onClick={this.createParticles}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <img
              src={"./img/" + item.img}
              alt={item.title}
              className="full-img"
            />

            {particles.map(p => (
              <span
                key={p.id}
                className="particle heart"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  color: p.color,
                  transform: `translate(-50%, -50%)`,
                  '--dx-start': '0px',
                  '--dy-start': '0px',
                  '--dx-mid': `${p.dxMid}px`,
                  '--dy-mid': `${p.dyMid}px`,
                  '--dx-mid2': `${p.dxMid2}px`,
                  '--dy-mid2': `${p.dyMid2}px`,
                  '--dx-end': `${p.dxEnd}px`,
                  '--dy-end': `${p.dyEnd}px`,
                }}
              >
                ❤
              </span>
            ))}
          </div>

          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <b>{item.price}$</b>

          <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
        </div>
      </div>
    );
  }
}

export default ShowFullitem;
