import { ResourceCard } from "../../components/ui/ResourceCard";
import React from "react";
import { resources } from "./resources";
// import { useParams } from "react-router-dom";

const ResourceGrid = () => {



  return (
    <div className="px-5 md:px-20 mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourceGrid;
