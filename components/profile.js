"use client";
import PropTypes from "prop-types";
import Image from "next/image";
import React from "react";

export default function Profile({ name, imageUrl, imageSize = 100 }) {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={imageUrl.trimStart()}
        alt={`${name}'s profile picture`}
        width={imageSize}
        height={imageSize}
        className="rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageSize: PropTypes.number,
};
Profile.defaultProps = {    
    imageSize: 100,
};