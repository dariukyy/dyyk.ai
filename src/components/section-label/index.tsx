function Section({ label, message }: { label: string; message: string }) {
  return (
    <div>
      <p className="text-xl font-semibold mb-2">{label}</p>
      <p className="text-sm font-light">{message}</p>
    </div>
  );
}

export default Section;
