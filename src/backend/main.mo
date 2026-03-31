import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type ContactFormSubmit = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactFormSubmit {
    public func compare(cfs1 : ContactFormSubmit, cfs2 : ContactFormSubmit) : Order.Order {
      Int.compare(cfs2.timestamp, cfs1.timestamp);
    };
  };

  let submissions = List.empty<ContactFormSubmit>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let submission : ContactFormSubmit = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getSubmissions() : async [ContactFormSubmit] {
    submissions.toArray().sort();
  };
};
