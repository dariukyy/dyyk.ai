function Section({ label, message }: { label: string; message: string }) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
}

export default Section;
