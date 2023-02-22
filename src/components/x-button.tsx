import React, { FC, MouseEventHandler } from "react";

export const XButton: FC<{ onClick: MouseEventHandler<HTMLButtonElement> }> = ({ onClick }) => {
  return (
    <button className="delete round" type="button" onClick={ onClick }>
      <div className="svg-symbol">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path
            fill="#c42222"
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
      </div>
    </button>
  )
};