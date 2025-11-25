-- Update supervisor_responses table to store director information
-- The selected_schools column will now store objects with: id, name, director_name, director_phone

-- Add a comment to document the new structure
comment on column public.supervisor_responses.selected_schools is 
'Array of selected schools with structure: [{id: uuid, name: text, director_name: text, director_phone: text}]';
